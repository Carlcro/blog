import React from "react";
import axios from "axios";
import Layout from "../components/layout";
import Head from "next/head";

export default function Pokemon({ pokemon }) {
  return (
    <Layout>
      <Head>
        {pokemon ? <title>{`${pokemon.name}`}</title> : <title>Pokemon</title>}
      </Head>
      <h1>Pokemon</h1>
      {pokemon && (
        <div>
          <h2>Hej</h2>
          <p>Name: {pokemon.name}</p>
          <p>Weight: {pokemon.weight}</p>
          <img
            src={`${pokemon.sprites.back_default}`}
            alt={`${pokemon.name}`}
          ></img>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  if (query.name) {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${query.name}/`
    );

    return {
      props: {
        pokemon: data,
      },
    };
  }

  return {
    props: {},
  };
}
