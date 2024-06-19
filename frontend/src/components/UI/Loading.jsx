import style from "../../styles/loading.module.css"

const Loading = () => {
  return (
    <div className=" relative top-0 left-0 w-screen h-screen flex flex-col gap-3 items-center justify-center bg-white z-[101]">
      <div className={style.otto}></div>
      loading
    </div>
  );
};

export default Loading;