import Head from 'next/head'
import { LineChart, Line, Brush, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import moment from 'moment'
import { useState } from 'react'

export default function Home({latestEURUSD: data, historicalLastYearEURUSD: data2, historicalLast3MonthsEURUSD: data3, historicalLastMonthEURUSD: data4}) {

  var keyRate = Object.keys(data.rates).map((key, value) => key)
  var dateLatestValue = new Date(data.date)
  var dateLatestValueFormatted = (dateLatestValue.getDate()).toString().padStart(2, "0") + '-' + (dateLatestValue.getMonth() + 1).toString().padStart(2, "0") + '-' + (dateLatestValue.getFullYear())
  var data2Array = Object.entries(data2.rates)
  var formattedData = []
  data2Array.forEach(d => {
    var currency = Object.entries(d[1])[0]
    formattedData.push({date: d[0], currency: currency[0], value: currency[1]})
  })

  var data3Array = Object.entries(data3.rates)
  var data4Array = Object.entries(data4.rates)

  const [formattedData2, setFormattedData2] = useState(formattedData)

  const changeData3Months = () => {
    setFormattedData2([])
    var tmpData = []
    data3Array.forEach(d => {
      var currency = Object.entries(d[1])[0]
      tmpData.push({date: d[0], currency: currency[0], value: currency[1]})
    })
    setFormattedData2(tmpData)
  }

  const changeDataLastMonth = () => {
    setFormattedData2([])
    var tmpData = []
    data4Array.forEach(d => {
      var currency = Object.entries(d[1])[0]
      tmpData.push({date: d[0], currency: currency[0], value: currency[1]})
    })
    setFormattedData2(tmpData)
  }

  const changeDataLastYear = () => {
    setFormattedData2(formattedData)
  }

  return (
    <div className="container">
      <Head>
        <title>FrankFurter consumer app</title>
      </Head>

      <main>
        <h1 className="title">
        <a href="https://frankfurter.app">FrankFurter API</a> consumer app
        </h1>
        <h4>Updated on: {dateLatestValueFormatted}</h4>

        <div className="grid">
          <div className="card">
            <h3>{data.base} vs {keyRate}</h3>
            <p>{data.base} {data.amount} = {keyRate} {data.rates.USD}</p>
          </div>

          <div className="card graph-card">
            <h3 style={{paddingLeft: 1.5 + 'rem'}}>Historical EUR vs USD</h3>
            <div className="button-wrapper">
              <button onClick={() => changeDataLastMonth()}>1 month</button>
              <button onClick={() => changeData3Months()}>3 months</button>
              <button onClick={() => changeDataLastYear()}>1 year</button>
            </div>
            <ResponsiveContainer  width="100%" height={400}>
              <LineChart data={formattedData2} margin={{top: 15,right: 0,left: 0,bottom: 15}}>
                <Line type="monotone" dataKey="value" stroke="#0070F3" strokeWidth={5} dot={false}/>
                <XAxis 
                  dataKey="date"
                  minTickGap={20}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card graph-card">
            <h3 style={{paddingLeft: 1.5 + 'rem'}}>Historical EUR vs USD</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formattedData} margin={{top: 15,right: 0,left: 0,bottom: 15}}>
                <Line type="monotone" dataKey="value" stroke="#0070F3" strokeWidth={5} dot={false}/>
                <XAxis 
                  dataKey="date"
                  minTickGap={20}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>


      <footer>
        <span>Developed by Alejandro Viño Loureiro</span>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 100%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .graph-card {
          padding: 1.5rem 0 !important;
        }

        .card:hover,
        .card:focus,
        .card:active,
         {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3, .graph-card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .button-wrapper {
          margin-left: 1.5rem;
          padding: 0.5rem 0 1.5rem 0;
        }

        button {
          all: unset;
          padding: 0.5rem 1rem;
          border: 1px solid #8f8f8f;
          border-radius: 10px; 
          margin-left: 10px;
        }

        button:hover {
          color: #0070f3;
          border-color: #0070f3;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const resp1 = await fetch('https://api.frankfurter.app/latest?to=USD')
    const latestEURUSD = await resp1.json()
    const date = moment().subtract(1, 'year')
    const lastYearString = (date.year()) + '-' + (date.month() + 1).toString().padStart(2, "0") + '-' + (date.date()).toString().padStart(2, "0")
    const resp2 = await fetch('https://api.frankfurter.app/'+lastYearString+'..?to=USD')
    const historicalLastYearEURUSD = await resp2.json()
    const threeLastMonthsDate = moment().subtract(3, 'months')
    const threeLastMonthsString = (threeLastMonthsDate.year()) + '-' + (threeLastMonthsDate.month() + 1).toString().padStart(2, "0") + '-' + (threeLastMonthsDate.date()).toString().padStart(2, "0")
    const resp3 = await fetch('https://api.frankfurter.app/'+threeLastMonthsString+'..?to=USD')
    const historicalLast3MonthsEURUSD = await resp3.json()
    const lastMonthDate = moment().subtract(1, 'months')
    const lastMonthString = (lastMonthDate.year()) + '-' + (lastMonthDate.month() + 1).toString().padStart(2, "0") + '-' + (lastMonthDate.date()).toString().padStart(2, "0")
    const resp4 = await fetch('https://api.frankfurter.app/'+lastMonthString+'..?to=USD')
    const historicalLastMonthEURUSD = await resp4.json()
    return {
      props: {
        latestEURUSD,
        historicalLastYearEURUSD,
        historicalLast3MonthsEURUSD,
        historicalLastMonthEURUSD
      }
    }
  } catch (error) {
    console.log(error)
  }
}