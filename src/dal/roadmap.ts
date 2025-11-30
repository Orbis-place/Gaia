import axios from 'axios';

export type PostStatus = {
   name: string;
   color: string;
   type: string;
   isDefault: boolean;
   id: string;
};

export type PostCategory = {
   category: string;
   icon: { type: string; value: string };
};

export type Submission = {
   title: string;
   content: string;
   upvotes: number;
   postStatus: PostStatus;
   date: string;
   lastModified: string;
   pinned: boolean;
   id: string;
   postCategory: PostCategory;
};

export async function getRoadmapData(): Promise<Submission[]> {
   let acc = [];
   const res = await axios.get<{ results: Submission[]; totalPages: number }>(
      'https://orbis.featurebase.app/api/v1/submission?sortBy=upvotes%3Adesc',
   );
   if (res.status !== 200) throw new Error(`Failed to fetch roadmap data: ${res.status}`);
   acc = acc.concat(res.data.results);

   // pagination
   for (let page = 2; page <= res.data.totalPages; page++) {
      const resPage = await axios.get<{ results: Submission[] }>(
         `https://orbis.featurebase.app/api/v1/submission?sortBy=upvotes%3Adesc&page=${page}`,
      );
      if (resPage.status !== 200) throw new Error(`Failed to fetch roadmap data: ${resPage.status}`);
      acc = acc.concat(resPage.data.results);
   }

   // get the top 5 ones that are "In Progress"
   const inProgress = acc.filter((submission) => submission.postStatus.name == 'In Progress').slice(0, 5);

   return inProgress.slice(0, 5);
}
