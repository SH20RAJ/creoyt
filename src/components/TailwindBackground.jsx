export function TailwindBackground({ children }) {
    return (
      <div className="relative  flex  m-0 p-0  ">
        { children}
        <div className="absolute -z-10 bottom-0 left-[-20%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        <div className="absolute -z-10 bottom-0 right-[-20%] top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      </div>
    );
  }