import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
      <Header/>

      <main className='text-center'>
        {children}
      </main>
    </>
  )
};
