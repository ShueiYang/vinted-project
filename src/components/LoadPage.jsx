


const LoadPage = () => {

    const dummyDatas = Array.from({ length: 2 });
  
    return (
      <div className="ph-item p-10 md:p-20 mt-10">
        <div className="ph-col-12">
          {dummyDatas.map((_, index) => {
            return (
              <div className="mt-10" key={index}>
                <div className="ph-picture"></div>
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
  
  export default LoadPage;