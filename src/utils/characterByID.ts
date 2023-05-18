export function characterByID(cid : number)
{
const query = 
        `query($cid: Int){
          Character(id: $cid){
            id
            favourites
            name {
              first
              middle
              last
              full
              native
            }
            gender
            age
            image{
              large
              medium
            }
          }
      }`;
      
        const variables = {
          cid : cid,
          };
      
          const url = 'https://graphql.anilist.co',
          options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify({
                  query: query,
                  variables: variables
              })
          };
  
        const data = fetch(url,options)
          .then((result) => result.json())
          .then((result) => {
            return result.data.Character 
          }) 
          return data
    }