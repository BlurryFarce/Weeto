import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getOptionsForVote } from "~/utils/getRandomCharID";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {

  const [first, second] = getOptionsForVote();
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Vote your favourite</div>
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className="p-2" />
          <div className="w-16 h-16 bg-blue-600">{first}</div>
          <div className="p-8">Vs</div>
          <div className="w-16 h-16 bg-blue-600"> {second}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
