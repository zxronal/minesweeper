export class BoardConstants {
  public static MAX_MINE_PORCENT = 0.4;
  public static MIN_MINE_PORCENT = 0.1;
  public static MAX_COLUMNS = 15;
  public static MIN_COLUMNS = 3;
  public static MAX_ROWS = 15;
  public static MIN_ROWS = 3;
  public static CELL_STATE_COVERT = 'covert';
  public static CELL_STATE_UNCOVERT = 'uncovert';
  public static CELL_STATE_MARKED_FLAG = 'markedFlag';
  public static CELL_STATE_MARKED_INTERROGANT = 'markedInterrogant';
  public static CELL_STATE_MINE_UNCOVERT_LOSE = 'mineUncovertLose';
  public static CELL_STATE_MINE_UNCOVERT = 'mineUncovert';
  public static CELL_STATE_MINE_X = 'mineUncovertX';
  public static CREATE_GAME_ACTION = 'create game';
  public static LEFT_CLICK_ACTION = 'left click';
  public static RIGHT_CLICK_ACTION = 'right click';
}
