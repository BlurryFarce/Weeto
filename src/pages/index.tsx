import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { trpc } from "~/utils/trpc";
import { inferQueryResponse } from "./api/trpc/[trpc]";
import Link from "next/link";


const btn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"

const Home: NextPage = () => {
  const {data: characterPair,
          refetch,
          isLoading,
        } = trpc.characters.useQuery(undefined,
          {refetchInterval: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false})

    const voteMutation = trpc.vote.useMutation()
    
    const voteForFav = (selected : number) =>{

      if (!characterPair) return; 

      if (selected === characterPair?.firstCharacter.id) {
        voteMutation.mutate({
          votedFor: characterPair?.firstCharacter.id,
          votedAgainst: characterPair?.secondCharacter.id,
        });
      } else {
        voteMutation.mutate({
          votedFor: characterPair?.secondCharacter.id,
          votedAgainst: characterPair?.firstCharacter.id,
        });
    }
    refetch()
  }

  const fetchingNext = voteMutation.isLoading || isLoading;
 
  return (
      <div className="h-screen w-screen flex flex-col justify-between items-center relative">
        <Head>
        <title>Weeto</title>
      </Head>
        <div className="text-2xl text-center pt-8">Vote for your favourite character</div>
        <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
            {characterPair &&(
              <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
              <ChracterListing
              character = {characterPair.firstCharacter}
              vote={() => voteForFav(characterPair.firstCharacter.id)}
              disabled={fetchingNext}
              />
              <div className="p-8 italic text-xl">{"or"}</div>
              <ChracterListing
              character = {characterPair.secondCharacter}
              vote={() => voteForFav(characterPair.secondCharacter.id)}
                disabled={fetchingNext}
                />
               <div className="p-2"/>
              </div>
            )}
            {!characterPair && <img src="/spinning-circles.svg" className="w-48" />}
          </div>
            <div className="w-full text-xl text-center pb-2">
                <Link href="/results">
                Results
                </Link>
          </div>
        </div>
  );
};

type CharacterFromServer = inferQueryResponse<"characters">["firstCharacter"];

const ChracterListing: React.FC<{
  character: CharacterFromServer;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity 
     ${props.disabled && "opacity-0"}`}
      key={props.character.id}
    >
      <div className="text-xl text-center capitalize mt-[-0.5rem]">
        {props.character.name}
      </div>
      
      <Image
        src={props.character.imageUrl}
        alt="character img"
        width={256}
        height={256}
        className="animate-fade-in"
      />
       <div className="p-2"/>
      <button
        className={btn}
        onClick={() => props.vote()}
       disabled={props.disabled}>
        Vote
      </button>
    </div>
  );
};
export default Home;
