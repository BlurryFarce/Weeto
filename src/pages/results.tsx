import { GetServerSideProps } from 'next';
import { prisma } from "../backend/utils/prisma";
import{AsyncReturnType } from "../utils/ts-bs";

import Image from "next/image";
import Head from "next/head";

const getCharactersInOrder = async () => {
    return await prisma.character.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });

};

type CharacterQueryResult = AsyncReturnType<typeof getCharactersInOrder>;

const generateCountPercent = (character: CharacterQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = character._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const CharacterListing: React.FC<{ character: CharacterQueryResult[number], rank: number }> = ({
  character,
  rank,
}) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
         <div className="flex items-center pl-4">
          <Image
            src={character.imageUrl}
            width={64}
            height={64}
            alt="charImg"
          />
          <div className="pl-2 capitalize">{character.name}</div>
        </div>
      </div>
      <div className="pr-4">
        {generateCountPercent(character).toFixed(2) + "%"}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{ character: CharacterQueryResult }> = (props) => {
    if (!props.character) {
        return (
          <div className="flex flex-col items-center">
            <Head>
              <title>Favourite Character Results</title>
            </Head>
            <h2 className="text-2xl p-4">Results</h2>
            <div className="flex flex-col w-full max-w-2xl border">
              <p>Loading...</p>
            </div>
          </div>
        );
      }
    return (
      <div className="flex flex-col items-center">
        <Head>
          <title>Favourite Character Results</title>
        </Head>
        <h2 className="text-2xl p-4">Results</h2>
        <div className="flex flex-col w-full max-w-2xl border">
          {props.character.sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentCharacter, index) => (
            <CharacterListing
              character={currentCharacter}
              key={index}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    );
  };
  
export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
    const characterOrdered = await getCharactersInOrder();
    return  { props: { character: characterOrdered } , revalidate: 60};
};