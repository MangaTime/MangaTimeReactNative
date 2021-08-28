import PushNotification from 'react-native-push-notification';
import { Chapter, Manga, MangaPersistState } from '../redux/Manga/interfaces';

export const processFollowingChapterFeed = (
  fetchedChapters: Chapter[],
  state: MangaPersistState,
): Chapter[] => {
  fetchedChapters.forEach((c: Chapter) => {
    const chapter = c;
    if (typeof chapter.manga === 'string') {
      // get manga information from (to be) persisted following manga list
      const mangaId = chapter.manga;
      const mangaInfo = state.followingManga?.find((e) => e.id === mangaId);
      chapter.manga = mangaInfo;
    }
  });
  // if state is not empty, compare fetched list with state, any extra objects from the fetched list is updated
  if (state.followingFeed) {
    const oldIds = state.followingFeed.map((e) => e.id);
    fetchedChapters
      ?.filter((e) => !oldIds.includes(e.id))
      .forEach((chapter) => {
        // send push notifications

        PushNotification.localNotification({
          channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          title: `${
            typeof chapter.manga === 'object'
              ? (chapter.manga as Manga).name
              : 'Unknown'
          }`,
          message: `Chapter ${chapter.name} ${
            chapter.title ? `- ${chapter.title}` : ''
          }`, // (required)
          subText: 'New chapter',
          group: 'new-manga', // (optional) add group to message
          userInfo: chapter,
        });

        PushNotification.localNotification({
          id: 0,
          channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          message: `Summary`, // (required)
          subText: 'New chapters',
          group: 'new-manga', // (optional) add group to message
          groupSummary: true,
        });
      });
  }
  // save the fetched list to the state
  // NOTE: for testing: shift 2 first chapters from the list, in order to show notification as "new chapter" for them
  if (!state.followingFeed) {
    fetchedChapters?.shift();
    fetchedChapters?.shift();
    fetchedChapters?.shift();
  }
  return fetchedChapters;
};
