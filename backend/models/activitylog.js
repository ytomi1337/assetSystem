const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define(
    'ActivityLog',
    {
      operationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      it_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deviceId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      user: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      targetUser: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'activity_logs',
      timestamps: true
    }
  );

  ActivityLog.beforeCreate(async (log, options) => {
    const prefixMap = {
      AddedToDB: 'AAA',
      Edited: 'EEE',
      Deleted: 'DDD',
      Transfer: 'TTT'
    };

    const prefix = prefixMap[log.action] || 'XXX';

    const lastLog = await ActivityLog.findOne({
      where: {
        operationNumber: {
          [Op.like]: `${prefix}-%`
        }
      },
      order: [['createdAt', 'DESC']],
      attributes: ['operationNumber']
    });

    let nextNumber = 1;
    if (lastLog?.operationNumber) {
      const last = parseInt(lastLog.operationNumber.split('-')[1]);
      if (!isNaN(last)) {
        nextNumber = last + 1;
      }
    }

    const padded = String(nextNumber).padStart(5, '0');
    log.operationNumber = `${prefix}-${padded}`;
  });

  return ActivityLog;
};
