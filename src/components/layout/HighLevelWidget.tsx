import Script from "next/script";

export default function HighLevelWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a46860d686a90131bee5f0f"
      strategy="lazyOnload"
    />
  );
}