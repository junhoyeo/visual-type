import axios from 'axios';

interface INode {
  node: {
    shortcode: string;
    thumbnail_src: string;
  };
};

const scrapeData = (html: string) => {
  const dataExp = /window\._sharedData\s?=\s?({.+);<\/script>/;
  const dataString = html.match(dataExp);
  if (dataString) {
    return JSON.parse(dataString[1]);
  }
  return null;
};

export default async function getAllPosts(userID: string) {
  const { data: html } = await axios.get(`https://www.instagram.com/${userID}/`);
  const data = scrapeData(html);

  const { entry_data: { ProfilePage: pages } } = data;
  const { graphql: { user: { edge_owner_to_timeline_media: { edges: posts } } } } = pages[0];

  const result = posts.map(({ node }: INode) => {
    const { shortcode: postID, thumbnail_src: thumbnail } = node;
    return {
      postID,
      thumbnail,
    }
  });
  return result;
};
