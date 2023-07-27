import Layout from "@/components/Layout";

export default function Home() {
  return (
    <div className="home">
      <Layout>
        <div>
          <iframe
            width="100%"
            style={{height: 1800}}
            src="https://news.aihub.ren/"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            allowFullScreen={true}
          ></iframe>
        </div>
      </Layout>
    </div>
  );
}
