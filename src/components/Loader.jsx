


const Loader = () => {

  const dummyDatas = Array.from({ length: 10 });

  return (
    <div className="ph-item" id="load">
      <div className="ph-col-12 card-offer">
        {dummyDatas.map((_, index) => {
          return (
            <div className="mt-2" key={index} >
              <div className="ph-picture ph-load"></div>
              <div className="ph-row">
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-12"></div>
                <div className="ph-col-12"></div>
                <div className="ph-col-12"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loader;