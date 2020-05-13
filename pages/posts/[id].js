import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import axios from "axios";

export default function Post({ postData, pokemon }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        {pokemon && (
          <div>
            <p>{pokemon.name}</p>
            <img src={`${pokemon.sprites.back_default}`}></img>
          </div>
        )}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  if (params.id === "use-pokemon-api") {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/charmander/"
    );
    return {
      props: {
        postData,
        pokemon: data,
      },
    };
  }

  return {
    props: {
      postData,
    },
  };
}
