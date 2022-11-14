export const get25ArtistByCountry = async (country: string, offset: number = 0) => {
    const url: string = "https://musicbrainz.org/ws/2/artist?query=area:" + country + "&offset=" + offset + "&fmt=json";
    const httpResponse: Response = await fetch(url, { mode: "cors" });
    if (httpResponse.status !== 200) {
      throw new Error( "Error");
    }
    return (await httpResponse.json());
}