module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "INTE_NODO_ONLINE_2",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "INTE_NODO_ONLINE_2",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "10.8.3.222:1523/NDPSPCS",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    poolMax       : 2
  };