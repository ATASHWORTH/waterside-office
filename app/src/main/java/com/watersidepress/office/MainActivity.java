package com.watersidepress.office;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/** The Daily Office: the bundled page (web/index.html) in a full-screen WebView. Works offline. */
public class MainActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#EEF1EE"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setTextZoom(100); // the page has its own text-size control
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri u = req.getUrl();
                if ("file".equals(u.getScheme())) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, u)); // ESV links and email open outside the app
                } catch (Exception ignored) {
                }
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "OfficeNative");
        setContentView(web);

        if (saved != null) web.restoreState(saved);
        else web.loadUrl("file:///android_asset/index.html");
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Opening the app on a new day brings up that day's Office.
        if (web != null) web.evaluateJavascript("window.dispatchEvent(new Event('focus'))", null);
    }

    @Override
    public void onBackPressed() {
        // Close an open settings/about sheet first; otherwise leave the app.
        web.evaluateJavascript("window.officeBack && window.officeBack()", result -> {
            if (!"true".equals(result)) MainActivity.super.onBackPressed();
        });
    }

    private void applyBars(boolean dark) {
        Window w = getWindow();
        int bg = dark ? Color.parseColor("#111816") : Color.parseColor("#EEF1EE");
        w.setStatusBarColor(bg);
        w.setNavigationBarColor(bg);
        web.setBackgroundColor(bg);
        View decor = w.getDecorView();
        int flags = decor.getSystemUiVisibility();
        int light = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        decor.setSystemUiVisibility(dark ? (flags & ~light) : (flags | light));
    }

    /** Called from the page's JavaScript as window.OfficeNative. */
    class Bridge {
        @JavascriptInterface
        public void keepAwake(boolean on) {
            runOnUiThread(() -> {
                if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }

        /** Fetches ESV text natively (a file:// page cannot make this request itself), then calls back cb(body, status). */
        @JavascriptInterface
        public void esvFetch(String url, String key, String cb) {
            if (!url.startsWith("https://api.esv.org/") || !cb.matches("__esv\\d+")) return;
            new Thread(() -> {
                int status = 0;
                String body = "";
                try {
                    HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
                    c.setConnectTimeout(12000);
                    c.setReadTimeout(20000);
                    c.setRequestProperty("Authorization", "Token " + key);
                    status = c.getResponseCode();
                    InputStream in = status < 400 ? c.getInputStream() : c.getErrorStream();
                    if (in != null) {
                        ByteArrayOutputStream out = new ByteArrayOutputStream();
                        byte[] buf = new byte[8192];
                        int n;
                        while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                        in.close();
                        body = out.toString("UTF-8");
                    }
                    c.disconnect();
                } catch (Exception ignored) {
                    status = 0;
                }
                final String js = "window." + cb + " && window." + cb + "(" + JSONObject.quote(body) + "," + status + ")";
                runOnUiThread(() -> web.evaluateJavascript(js, null));
            }).start();
        }

        @JavascriptInterface
        public void setDark(boolean dark) {
            runOnUiThread(() -> applyBars(dark));
        }
    }
}
