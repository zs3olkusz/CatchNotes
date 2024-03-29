// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

/* Note Section
 * Model will be section of note that will be displayed on page.
 * It will contain basic plain text note, quiz, image, voice message.
 */
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const noteSections = sequelizeClient.define(
    'note_sections',
    {
      subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('text', 'quiz', 'image', 'voice', 'file'),
        defaultValue: 'text',
      },
      index: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (noteSections as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { notes, quiz_answers } = models;

    noteSections.belongsTo(notes);
    noteSections.hasMany(quiz_answers);
  };

  return noteSections;
}
