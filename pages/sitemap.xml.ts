import { GetServerSideProps } from "next";
import { fetchBlogPosts, fetchJobListings, fetchTrainingPrograms } from "@/services/sitemapService";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const posts = await fetchBlogPosts();
    const jobs = await fetchJobListings();
    const trainings = await fetchTrainingPrograms();

    const urls = [
        { loc: "https://www.coastresearchtechnology.com/", priority: "1.0", changefreq: "weekly" },
        { loc: "https://www.coastresearchtechnology.com/coast-craft", priority: "0.9", changefreq: "daily" },
        { loc: "https://www.coastresearchtechnology.com/jobs", priority: "0.9", changefreq: "daily" },
        { loc: "https://www.coastresearchtechnology.com/training", priority: "0.9", changefreq: "weekly" },
    ];

    posts.forEach(post => urls.push({ loc: `https://www.coastresearchtechnology.com/coast-craft/${post.slug}`, priority: "0.7", changefreq: "daily" }));
    jobs.forEach(job => urls.push({ loc: `https://www.coastresearchtechnology.com/jobs/${job.slug}`, priority: "0.7", changefreq: "daily" }));
    trainings.forEach(training => urls.push({ loc: `https://www.coastresearchtechnology.com/training/${training.slug}`, priority: "0.7", changefreq: "weekly" }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map(url => `
        <url>
            <loc>${url.loc}</loc>
            <priority>${url.priority}</priority>
            <changefreq>${url.changefreq}</changefreq>
        </url>
        `)
        .join("")}
    </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
};

export default Sitemap;
