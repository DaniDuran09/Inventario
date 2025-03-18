
export const fetchData = async () => {
    try {
      const response = await fetch(
        "https://5747-2806-2f0-a320-f5bd-f421-e7bc-17f7-90f5.ngrok-free.app/api/productos",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };


  export const objeto = [{id:'1234'},{},{},{}]

//el principal




  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://5747-2806-2f0-a320-f5bd-f421-e7bc-17f7-90f5.ngrok-free.app/api/productos",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log("ERROR : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(data);
  }, []);*/