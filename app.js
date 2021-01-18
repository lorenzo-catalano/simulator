const express = require('express')
const fs = require('fs');
const app = express()
const utils = require('./rt.js')
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');


const bodyParser = require('body-parser');
app.use(bodyParser.text({
'type':'*/*'
}))



var STAZIONE = 'stazioneLorenz'

var pspChiediListaRTResponse = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.pagamenti.telematici.gov/"> 
<soapenv:Header/> 
<soapenv:Body> 
  <ws:pspChiediListaRTResponse> 
    <pspChiediListaRTResponse> 
      {ELEMENTI}
    </pspChiediListaRTResponse> 
  </ws:pspChiediListaRTResponse> 
</soapenv:Body> 
</soapenv:Envelope>`

var pspChiediRTResponse = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.pagamenti.telematici.gov/">
<soapenv:Header/>
<soapenv:Body>
   <ws:pspChiediRTResponse>
      <pspChiediRTResponse><rt>{RT}</rt></pspChiediRTResponse>
   </ws:pspChiediRTResponse>
</soapenv:Body>
</soapenv:Envelope>`

var listaRtQuery = `select snap.ID_DOMINIO,SNAP.iuv,SNAP.CCP from STATI_RPT_SNAPSHOT snap 
LEFT JOIN RT rt ON rt.IUV = SNAP.iuv AND rt.CCP  = snap.CCP AND rt.IDENT_DOMINIO = snap.ID_DOMINIO
LEFT JOIN RETRY_PSP_ACK ret ON ret.IUV = SNAP.iuv AND ret.CCP  = snap.CCP AND ret.ID_DOMINIO = snap.ID_DOMINIO
where snap.IUV like 'IUV_T_%' and snap.stato in ('RPT_ACCETTATA_PSP','RT_ACCETTATA_NODO')
AND rt.ID IS NULL AND RET.ID IS NULL `

function getPspListaRT() {
  return oracledb.getConnection(dbConfig).then(conn=> {
    return conn.execute(listaRtQuery).then(data=>{
      conn.close()
      return data.rows
    }).catch(err=>{
      console.log(err)
    })
  })
}

app.get('/', (request, response) => {
  console.log("get /")
  response.send(`Simulator UP`)
})

app.post('/timeout/:millis',(req,res)=>{
    console.log(`timeout ${req.params.millis} seconds`)
    setTimeout(()=>{
        console.log(`sending response`)
        res.status(200).send(`<ciao><faultcode>EGOV_ITjjjjjjjjjj_002</faultcode><detail>timeout</detail></ciao>`)
    },req.params.millis*1000)
})

app.post('/*', (request, response) => {
  var action = request.headers.soapaction
  var sid = request.headers.sid || ""
  var tcid = request.headers.tcid
  console.log(`${action.padEnd(30,' ')} ${sid}`)

  var testCase
  var spl = sid.split('_')
  if(spl.length>1){
    testCase = sid.split('_')[1]+'.xml'
  }else{
    testCase = 'OK.xml'
  }

  var defaultFile = `tests/${action.replace(/"/g,'')}/${testCase}`

  fs.readFile(defaultFile, 'utf8', function(err, contents) {
    if(err){
      console.log(`\tfile not found [${defaultFile}]`)
      response.send('mock file not found')
    }else{
      console.log(`\tsending [${defaultFile}]`)
      response.send(contents.replace('{RANDOM}',new Date().getTime()))
    }
  });

  return 


  if(action){
    var defaultFile
    switch(action){
      case '"pspInviaCarrelloRPT"':
        defaultFile = `${__dirname}/tests/nicrpt/NICRPT-01.xml`
        break;
      case '"pspInviaRPT"':
        var ccp = request.body.match('<codiceContestoPagamento>(.*)</codiceContestoPagamento>')[1]
        sendWrong = ccp.endsWith('WRONG')
        defaultFile = `${__dirname}/tests/nirpt/NIRPT-1.xml`
        break;
      case '"paaInviaRT"':
        var ccp = request.body.match('<codiceContestoPagamento>(.*)</codiceContestoPagamento>')[1]
        sendWrong = ccp.endsWith('WRONG')
        defaultFile = `${__dirname}/tests/nirt/NIRT-01.xml`
        break;
      case '"paaInviaRichiestaRevoca"':
        defaultFile = `${__dirname}/tests/nirr/richiestarevoca-OK.xml`
        break;
      case '"pspInviaRispostaRevoca"':
        defaultFile = `${__dirname}/tests/nirr/rispostarevoca-OK.xml`
        break;
      case '"pspInviaRichiestaStorno"':
        defaultFile = `${__dirname}/tests/nirs/richiestastorno-OK.xml`
        break;
      case '"paaInviaEsitoStorno"':
        defaultFile = `${__dirname}/tests/nirs/esitostorno-OK.xml`
        break;
      case '"pspChiediAvanzamentoRPT"':
        defaultFile = `${__dirname}/tests/pspChiediAvanzamentoRPT.xml`
        break;
      case '"paaAttivaRPT"':
        defaultFile = `${__dirname}/tests/narpt/NARPT-34.xml`
        break;
      case '"pspChiediListaRT"':

        getPspListaRT().then(rows=>{
          console.log(`found ${rows.length} rpt`)
          var elementi = rows.map(r=>{
            return `<elementoListaRTResponse> 
            <identificativoDominio>${r[0]}</identificativoDominio> 
            <identificativoUnivocoVersamento>${r[1]}</identificativoUnivocoVersamento> 
            <codiceContestoPagamento>${r[2]}</codiceContestoPagamento> 
            </elementoListaRTResponse>`
          }).join('')

          response.send(pspChiediListaRTResponse.replace('{ELEMENTI}',elementi))
        })
        break;
      case '"pspChiediRT"':
        var dominio = request.body.match('<identificativoDominio>(.*)</identificativoDominio>')[1]
        var iuv = request.body.match('<identificativoUnivocoVersamento>(.*)</identificativoUnivocoVersamento>')[1]
        var ccp = request.body.match('<codiceContestoPagamento>(.*)</codiceContestoPagamento>')[1]
        var rt = utils.makeRt(dominio,STAZIONE,iuv,ccp)
        var res = pspChiediRTResponse.replace('{RT}',Buffer.from(rt).toString('base64'))
        response.send(res)
        break;
      case '"pspInviaAckRT"':
        var ccp = request.body.match('<codiceContestoPagamento>(.*)</codiceContestoPagamento>')[1]
        sendWrong = ccp.endsWith('WRONG')
        defaultFile = `${__dirname}/tests/piart/OK.xml`
        break;
      default:
        console.log(`no default file found for [${action}]`)
        response.send('no soap action')
        return;
    }


    if(sendWrong && !sendOK){
      console.log('sending WRONG')
      response.send('WRONG')
      return;
    }

    console.log('sending file content')
    if(defaultFile){
      fs.readFile(defaultFile, 'utf8', function(err, contents) {
        if(err){
          console.log(`\tfile not found [${defaultFile}]`)
        }else{
          console.log(`\tsending response`)
          response.send(contents.replace('{RANDOM}',new Date().getTime()))
        }
      });
    }
  }else{
    response.send('no testCaseId in request headers')
  }
})



app.get('/500', (request, response) => {
  console.log("get /500")
  response.status(500).send(`<ciao><faultcode>EGOV_ITjjjjjjjjjj_002</faultcode><detail>cinquecento</detail></ciao>`)
})

module.exports = app