import { type NextPage } from "next";
import Image from "next/image";
import { trpc } from "~/utils/trpc";
import Trpc from "./api/trpc/[trpc]";
import { inferQueryResponse } from "./api/trpc/[trpc]";
import { any } from "zod";

const btn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"

const Home: NextPage = () => {
  const {data: characterPair,
          refetch,
          isLoading,
        } = trpc.characters.useQuery() 
 
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
    }}
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center pt-8">Vote your favourite</div>
        <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
            {characterPair &&(
              <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
              <ChracterListing
              character = {characterPair.firstCharacter}
              vote={() => voteForFav(characterPair.firstCharacter.id)}
              disabled={false}
              />
              <div className="p-8 italic text-xl">{"or"}</div>
              <ChracterListing
              character = {characterPair.secondCharacter}
              vote={() => voteForFav(characterPair.secondCharacter.id)}
                disabled={false}
              />
               <div className="p-2"/>
               </div>
            )}
          </div>
          </div>
    </>
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
        {props.character.name.full}
      </div>
      
      <Image
        src={props.character.image.large}
        width={256}
        height={256}
        alt="fc"
        className="animate-fade-in"
      />
      <button
        className={btn}
        onClick={() => props.vote()}
       disabled={props.disabled}
      >
        Vote
      </button>
    </div>
  );
};
export default Home;
