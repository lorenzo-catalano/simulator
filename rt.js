module.exports = {
    makeRt : (pa,stazione,iuv,ccp) =>{
        return `<pay_i:RT xsi:schemaLocation="http://www.digitpa.gov.it/schemas/2011/Pagamenti/ PagInf_RPT_RT_6_0.xsd "
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:pay_i="http://www.digitpa.gov.it/schemas/2011/Pagamenti/">
        <pay_i:versioneOggetto>6.0</pay_i:versioneOggetto>
        <pay_i:dominio>
            <pay_i:identificativoDominio>${pa}</pay_i:identificativoDominio>
            <pay_i:identificativoStazioneRichiedente>${stazione}</pay_i:identificativoStazioneRichiedente>
        </pay_i:dominio>
        <pay_i:identificativoMessaggioRicevuta>TR0001_20120302-10:37:52.0264-F098</pay_i:identificativoMessaggioRicevuta>
        <pay_i:dataOraMessaggioRicevuta>2012-03-02T10:37:52</pay_i:dataOraMessaggioRicevuta>
        <pay_i:riferimentoMessaggioRichiesta>TR0001_20120302-10:37:52.0264-F098</pay_i:riferimentoMessaggioRichiesta>
        <pay_i:riferimentoDataRichiesta>2012-01-26</pay_i:riferimentoDataRichiesta>
        <pay_i:istitutoAttestante>
            <pay_i:identificativoUnivocoAttestante>
                <pay_i:tipoIdentificativoUnivoco>G</pay_i:tipoIdentificativoUnivoco>
                <pay_i:codiceIdentificativoUnivoco>CodiceIdentificativoUnivocoAttestan</pay_i:codiceIdentificativoUnivoco>
            </pay_i:identificativoUnivocoAttestante>
            <pay_i:denominazioneAttestante>DenominazioneAttestante</pay_i:denominazioneAttestante>
            <pay_i:codiceUnitOperAttestante>CodiceUOA</pay_i:codiceUnitOperAttestante>
            <pay_i:denomUnitOperAttestante>DenomUnitOperAttestante</pay_i:denomUnitOperAttestante>
            <pay_i:indirizzoAttestante>IndirizzoAttestante</pay_i:indirizzoAttestante>
            <pay_i:civicoAttestante>11</pay_i:civicoAttestante>
            <pay_i:capAttestante>11111</pay_i:capAttestante>
            <pay_i:localitaAttestante>LocalitaAttestante</pay_i:localitaAttestante>
            <pay_i:provinciaAttestante>ProvinciaAttestante</pay_i:provinciaAttestante>
            <pay_i:nazioneAttestante>IT</pay_i:nazioneAttestante>
        </pay_i:istitutoAttestante>
        <pay_i:enteBeneficiario>
            <pay_i:identificativoUnivocoBeneficiario>
                <pay_i:tipoIdentificativoUnivoco>G</pay_i:tipoIdentificativoUnivoco>
                <pay_i:codiceIdentificativoUnivoco>11111111117</pay_i:codiceIdentificativoUnivoco>
            </pay_i:identificativoUnivocoBeneficiario>
            <pay_i:denominazioneBeneficiario>AZIENDA XXX</pay_i:denominazioneBeneficiario>
            <pay_i:codiceUnitOperBeneficiario>123</pay_i:codiceUnitOperBeneficiario>
            <pay_i:denomUnitOperBeneficiario>XXX</pay_i:denomUnitOperBeneficiario>
            <pay_i:indirizzoBeneficiario>IndirizzoBeneficiario</pay_i:indirizzoBeneficiario>
            <pay_i:civicoBeneficiario>123</pay_i:civicoBeneficiario>
            <pay_i:capBeneficiario>00123</pay_i:capBeneficiario>
            <pay_i:localitaBeneficiario>Roma</pay_i:localitaBeneficiario>
            <pay_i:provinciaBeneficiario>RM</pay_i:provinciaBeneficiario>
            <pay_i:nazioneBeneficiario>IT</pay_i:nazioneBeneficiario>
        </pay_i:enteBeneficiario>
        <pay_i:soggettoVersante>
            <pay_i:identificativoUnivocoVersante>
                <pay_i:tipoIdentificativoUnivoco>F</pay_i:tipoIdentificativoUnivoco>
                <pay_i:codiceIdentificativoUnivoco>RCCGLD09P09H501F</pay_i:codiceIdentificativoUnivoco>
            </pay_i:identificativoUnivocoVersante>
            <pay_i:anagraficaVersante>Gesualdo;Riccitelli</pay_i:anagraficaVersante>
            <pay_i:indirizzoVersante>via del gesu</pay_i:indirizzoVersante>
            <pay_i:civicoVersante>11</pay_i:civicoVersante>
            <pay_i:capVersante>00186</pay_i:capVersante>
            <pay_i:localitaVersante>Roma</pay_i:localitaVersante>
            <pay_i:provinciaVersante>RM</pay_i:provinciaVersante>
            <pay_i:nazioneVersante>IT</pay_i:nazioneVersante>
        </pay_i:soggettoVersante>
        <pay_i:soggettoPagatore>
            <pay_i:identificativoUnivocoPagatore>
                <pay_i:tipoIdentificativoUnivoco>F</pay_i:tipoIdentificativoUnivoco>
                <pay_i:codiceIdentificativoUnivoco>RCCGLD09P09H501E</pay_i:codiceIdentificativoUnivoco>
            </pay_i:identificativoUnivocoPagatore>
            <pay_i:anagraficaPagatore>Gesualdo;Riccitelli</pay_i:anagraficaPagatore>
            <pay_i:indirizzoPagatore>via del gesu</pay_i:indirizzoPagatore>
            <pay_i:civicoPagatore>11</pay_i:civicoPagatore>
            <pay_i:capPagatore>00186</pay_i:capPagatore>
            <pay_i:localitaPagatore>Roma</pay_i:localitaPagatore>
            <pay_i:provinciaPagatore>RM</pay_i:provinciaPagatore>
            <pay_i:nazionePagatore>IT</pay_i:nazionePagatore>
            <pay_i:e-mailPagatore>gesualdo.riccitelli@poste.it</pay_i:e-mailPagatore>
        </pay_i:soggettoPagatore>
        <pay_i:datiPagamento>
            <pay_i:codiceEsitoPagamento>0</pay_i:codiceEsitoPagamento>
            <pay_i:importoTotalePagato>10.00</pay_i:importoTotalePagato>
            <pay_i:identificativoUnivocoVersamento>${iuv}</pay_i:identificativoUnivocoVersamento>
            <pay_i:CodiceContestoPagamento>${ccp}</pay_i:CodiceContestoPagamento>
            <pay_i:datiSingoloPagamento>
                <pay_i:singoloImportoPagato>10.00</pay_i:singoloImportoPagato>
                <pay_i:esitoSingoloPagamento>REJECT</pay_i:esitoSingoloPagamento>
                <pay_i:dataEsitoSingoloPagamento>2001-01-01</pay_i:dataEsitoSingoloPagamento>
                <pay_i:identificativoUnivocoRiscossione>IUV6188_2018-09-17_10:21:18.132</pay_i:identificativoUnivocoRiscossione>
                <pay_i:causaleVersamento>pagamento fotocopie pratica</pay_i:causaleVersamento>
                <pay_i:datiSpecificiRiscossione>1/abc</pay_i:datiSpecificiRiscossione>
            </pay_i:datiSingoloPagamento>
        </pay_i:datiPagamento>
    </pay_i:RT>`
    }
}