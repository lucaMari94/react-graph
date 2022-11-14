export interface ArtistDefinition {
    id: string;
    type: string;
    name: string;
    score: number;
    country: string;
    gender: string;
    aliases: Array<{
      name: string;
      locale: string;
      type: string;
    }>;
    area: {
      name: string;
      type: string;
    };
  };