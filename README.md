This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## WIP
まだ未完成

## 技術

- Next.js
- Firebase
  - Authentication
  - Firestore
- Vercel

## 作業メモ

```
nodenv global 16.14.0
yarn create next-app --typescript
yarn add firebase
yarn add firebase-admin
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
yarn add @emotion/server
yarn add -D prettier eslint-config-prettier

npm install -g vercel
```

### TODO
- [ ] UIを整える
- [ ] タスク管理できるようにする
- [ ] セッション管理
- [ ] firebase appcheck


### firebase

- simple-todo-app-XXX@appspot.gserviceaccount.com	に「サービス アカウント トークン作成」ロールを追加

## 環境変数について

- Project Settings > Environment Variablesにてvercelに環境変数を割り当てられる.
- .envとvercelで同じ名前の環境変数がある場合, vercelの環境変数の値が採用される.
- vercelで環境変数を設定した場合, リデプロイする必要がある.


## Getting Started

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
