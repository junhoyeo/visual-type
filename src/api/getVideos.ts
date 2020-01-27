import axios from 'axios';

const headers = {
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7,ja;q=0.6',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  Cookie: 'vuid=pl811291393.674290865; player=""; _gcl_au=1.1.191779468.1580107713; _abexps=%7B%22982%22%3A%22control%22%7D; _ga=GA1.2.287139464.1580107714; _gid=GA1.2.319807398.1580107714; _fbp=fb.1.1580107714428.201730079; continuous_play_v3=1; auth_xsrft=91c68f4d9701a6e6fcc91fbca1e444828cf63693; vimeo_gdpr_optin=1; vimeo=OHL4ZPDdddPMVHLet4LL4LLSMxHdZNtBXX3ePDP%2C4aZNPND%2Cetd4DLZNDcZNP34LSaeMw3h_OI3uHLMIHLN44XDZcePD44XeddDXdNNaSSZdN%2C%2Ct4SBdDXa43tD%2CBL3Z%2CSdDaNdtP%2CNadXda%2C; __qca=P0-1755471057-1580110116254; __ssid=0c0f7315-5519-452e-9f9e-b15e1ca8988b; _gat_UA-76641-8=1',
  Host: 'vimeo.com',
  Pragma: 'no-cache',
  Referer: 'https://vimeo.com/user107907408',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
};

interface IClip {
  clip_id: number;
}

type ProfilePageInfo = {
  clips: IClip[];
  hasNext: Boolean;
};

const getProfilePage = async (userID: string, page: number): Promise<ProfilePageInfo> => {
  const { data: { clips: rawClips, clips_meta: { has_next: hasNext } } } = await axios.get(
    `https://vimeo.com/${userID}?action=get_profile_clips&page=${page}`,
    { headers },
  );
  const clips = rawClips.map((clip: IClip) => clip.clip_id);
  return { clips, hasNext };
};

export default async function getAllClips (userID: string) {
  let clipList: IClip[] = [];
  for (let page = 1;; page++) {
    const { clips, hasNext } = await getProfilePage(userID, page);
    clipList = clipList.concat(clips);
    if (!hasNext) {
      break;
    }
  }
  console.log(clipList);
};
