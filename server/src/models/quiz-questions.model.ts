// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const quizQuestions = sequelizeClient.define(
    'quiz_questions',
    {
      text: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (quizQuestions as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { note_sections } = models;

    quizQuestions.belongsTo(note_sections);
  };

  return quizQuestions;
}
