import { prisma } from "../src/backend/utils/prisma";
import { characterByID } from "../src/utils/characterByID";
const doBackfill = async () => {

    let ID = 0
    const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
    do{
        const character = await characterByID(ID)
        if (character != null && character.favourites >= 500){
            await prisma.character.create({data: {
                name: character.name.full,
                imageUrl: character.image.large
            }})
        }
        ID++
        await delay(1000 * 60 / 90); 
    }while(ID != 10000) 
    console.log("DB Filled")
};

doBackfill();