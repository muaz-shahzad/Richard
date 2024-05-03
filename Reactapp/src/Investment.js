import React, { useState, useEffect } from 'react';


const RecentIPOs = () => {

  const [topGainers, setTopGainers] = useState([]);
  const [toploser, settoploser] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [globalMarket, setGlobalMarket] = useState([]);



  const ticker = 'AAPL'; // Define ticker constant



  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    loadWatsonAssistant();


    return () => {
      // Cleanup the script when the component unmounts
      const watsonScript = document.getElementById('watson-script');
      if (watsonScript) {
        document.body.removeChild(watsonScript);
      }
    };
  }, []);

  const loadWatsonAssistant = () => {
    const script = document.createElement('script');
    script.id = 'watson-script';
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/{version}/WatsonAssistantChatEntry.js";
    script.async = true;


    script.onload = () => {
      window.watsonAssistantChatOptions = {
        integrationID: "9e0be13e-6cbb-4b61-9138-4bbb70b71be4", // Replace with your integration ID
        region: "us-south", // Replace with the region your instance is hosted in
        serviceInstanceID: "9673d88c-3a78-4f14-8ae1-354affb88484", // Replace with your service instance ID
        onLoad: function(instance) { instance.render(); }
      };
    };


    document.body.appendChild(script);
  };



  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/top-gainer-data/?ticker=${ticker}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
      const jsonData = await response.json();
      setTopGainers(jsonData.data.top_gainers);
      settoploser(jsonData.data.top_losers);
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/get_marketnews_data/?ticker=${ticker}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
      const jsonData = await response.json();
      // Make sure jsonData.feed exists before setting the state
      if (jsonData.data.feed) {
        setMarketNews(jsonData.data.feed);
      } else {
        // console.log('No feed data found in the response:', jsonData);
      }
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };



  const formatDateTime = (dateTimeString) => {
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hour = dateTimeString.slice(9, 11);
    const minute = dateTimeString.slice(11, 13);
    const second = dateTimeString.slice(13, 15);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };


  const fetchData3 = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/get_globalmarket_data/?function=FX_MONTHLY`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
      const jsonData = await response.json();
      if (jsonData) {
        console.log('Global Market Data:', jsonData.data.markets);
        setGlobalMarket(jsonData.data.markets);

      } else {
        console.log('Error: No markets data found in the response');
      }
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };
  // console.log("IPO " , globalMarket)

  return (
    <>

      {globalMarket ? (
        <div className='container p-4'>
          <div className='row'>
            <div className=''>
              <h5 className="fw-semibold">Global Market Status</h5>
              <div className="table-responsive" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr className="border">
                      <th className="border fw-semibold col-1">Market Type</th>
                      <th className="border fw-semibold col-1">Region</th>
                      <th className="border fw-semibold col-1">Primary Exchanges</th>
                      <th className="border fw-semibold col-1">Local Open</th>
                      <th className="border fw-semibold col-1">Local Close</th>
                      <th className="border fw-semibold col-1">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalMarket.map((market, index) => (
                      <tr key={index}>
                        <td className="border ">{market.market_type}</td>
                        <td className="border">{market.region}</td>
                        <td className="border">{market.primary_exchanges}</td>
                        <td className="border">{market.local_open}</td>
                        <td className=" border">{market.local_close}</td>
                        <td className="border">{market.current_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {topGainers ? (
        <div className='container p-4'>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className="fw-semibold">Top Gainers</h5>
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr className="border">
                      <th className="border fw-semibold  col-1">Symbol</th>
                      <th className="border fw-semibold text-center  col-1">Price</th>
                      <th className="border fw-semibold  col-1">Change Amount</th>
                      <th className="border fw-semibold text-center  col-1">Change Percentage</th>

                    </tr>
                  </thead>
                  <tbody>
                    {topGainers.map((gainer, index) => (
                      <tr key={index}>
                        <td className="border small" style={{ color: 'blue' }}>{gainer.ticker}</td>
                        <td className="border  text-center small">{gainer.price}</td>
                        <td className="border small text-center medium ">{gainer.change_amount}</td>
                        <td className="border small text-center medium fw-semibold" style={{ color: 'green' }}>{gainer.change_percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='col-md-6'>
              <h5 className="fw-semibold">Top Losers</h5>
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr className="border">
                      <th className="border fw-semibold  col-1">Symbol</th>
                      <th className="border fw-semibold text-center  col-1">Price</th>
                      <th className="border fw-semibold  col-1">Change Amount</th>
                      <th className="border fw-semibold text-center  col-1">Change Percentage</th>

                    </tr>
                  </thead>
                  <tbody>
                    {toploser.map((gainer, index) => (
                      <tr key={index}>
                        <td className="border small" style={{ color: 'blue' }}>{gainer.ticker}</td>
                        <td className="border  text-center small">{gainer.price}</td>
                        <td className="border small text-center medium ">{gainer.change_amount}</td>
                        <td className="border small text-center medium fw-semibold" style={{ color: 'green' }}>{gainer.change_percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p >
      )}

      {marketNews ? (
        <div className='container p-4'>
          <div className='row'>
            <div className='col-12'>
              <h5 className="fw-semibold">Market News</h5>
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table">
                  <tbody>
                    {marketNews.map((news, index) => (
                      <tr key={index}>
                        <td className="col-1 small">{formatDateTime(news.time_published)}</td>
                        <td className="medium" style={{ color: 'blue' }}>
                          <a href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
                          <span className="text-muted"> - {news.source}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p >
      )}






    </>

  );
};

export default RecentIPOs;