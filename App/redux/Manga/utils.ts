import { MangaSources } from '../../Services/MangaSources';
import { BaseMangaSource } from '../../Services/MangaSources/baseMangaSource';
import SupportedSources from '../../Services/MangaSources/supportedSources';
import { Chapter, Manga } from './interfaces';

export const arrayIntersect = (a: unknown[], b: unknown[]): boolean=>{
  return a.findIndex(e=>b.indexOf(e)!==-1)!==-1;
}

function mergeMultipleSourceData(data: (Manga|Chapter)[][]):(Manga|Chapter)[] {
  const result : (Manga|Chapter)[] = []
  data.forEach(singleSourceResult => {
    singleSourceResult.forEach(element=>{
      if(element.type==='manga'){
        const existingElementIndex = result.findIndex(ee=>arrayIntersect(element.names, (ee as Manga).names))
        const existingElement = existingElementIndex===-1?undefined:result[existingElementIndex] as Manga;
        if(!existingElement){
          // push if it's not already in the result array
          result.push(element)
        }else{
          // merge existing element with verifying element
          const elementCopy = {...element}
          const {chapters, sourceInfo} = existingElement;
          elementCopy.chapters?.forEach(e=>{
            const foundChapter = chapters?.find(e1=>e1.name===e.name)
            if(!foundChapter){
              chapters?.push(e)
            }
          })
          elementCopy.sourceInfo = {
            ... sourceInfo,
            ...element.sourceInfo,
          }
          result[existingElementIndex] = elementCopy;
        }
      }else
      if(element.type==='chapter'){
        const existingElement = result.find(ee =>element.name===(ee as Chapter).name) as Chapter
        if(!existingElement){
          // push if it's not already in the result array
          result.push(element)
        }else{
          // merge existing element with verifying element
          existingElement.sourceInfo = {
            ...existingElement.sourceInfo,
            ...element.sourceInfo, // prioritize new fetched element
          }
        }
      }
    })
  })
  return result;
};

export const createFetchMangaThunkCallback =
  <S extends keyof SupportedSources>(
    action: (mangaSource: BaseMangaSource) => Promise<(Chapter | Manga)[]> | undefined,
  ) =>
  async (source: S[] = []) => {
    if (source.length !== 0) {
      return Promise.all(
        source.map((sourceName) => action(MangaSources[sourceName])?.catch(()=>[]) ?? []), // get result from all sources
      ).then((allResult) =>{
        return mergeMultipleSourceData(allResult)
      }
      );
    } else {
      const mangaSource = MangaSources.MangaDex;
      return action(mangaSource) ?? [];
    }
  };