import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
      <Header/>

      <main className='max-w-xl m-auto text-center'>
        {children}
      </main>
    </>
  )
};
