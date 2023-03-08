module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define('Tokens', {
    iduser: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    token: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    sessionToken: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datainicial: {
      type: DataTypes.DATE,
      allowNull: false
    },
    datafinal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    active: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
    state: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    processid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    userconnected: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    vencimento: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    emailcob: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    webhook: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wh_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wh_message: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wh_qrcode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wh_connect: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tptoken: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    descricao: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    valor: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
		lastactivity: 'TIMESTAMP',
		created: 'TIMESTAMP',
		modified: 'TIMESTAMP',
	}, 
	{
		freezeTableName: true,
		tableName: 'tokens'
	});
  return Tokens;
};
