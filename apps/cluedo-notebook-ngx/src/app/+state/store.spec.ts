import {TestBed} from "@angular/core/testing";
import {cluedoStore} from "./store";
import {expect} from "vitest";
import {GameDefinition} from "../models/game-definition";

const TestingDataDefinition: GameDefinition = {
  title: 'Test Game',
  definition: {
    rooms: ['room-1', 'room-2'],
    suspects: ['suspect-1', 'suspect-2'],
    items: ['item-1', 'item-2']
  }
}

describe('cluedoStore', () => {
  it('should create a simple instance with default parameters', () => {

    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);

    expect(store.gameDefinition(), "By default `gameDefinition` should be 'classic'").toEqual('classic');

    expect(store.players(), "There should not be players at start of game").toHaveLength(0);
    expect(store.suspects(), "There should not be suspects sets at start of game").toHaveLength(0);
    expect(store.rooms(), "There should not be suspects sets at start of game").toHaveLength(0);
    expect(store.items(), "There should not be suspects sets at start of game").toHaveLength(0);
    expect(store.assignments(), "List of assignments should be empty").toEqual({});
  });

  it("should set application data when game was selected", () => {

    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);

    store.selectGame('test-game', TestingDataDefinition);

    expect(store.gameDefinition(), "Game definition should be 'test-game'").toEqual('test-game');
    expect(store.suspects(), "There should be 2 suspects sets at start of game").toHaveLength(2);
    expect(store.rooms(), "There should be 2 rooms sets at start of game").toHaveLength(2);
    expect(store.items(), "There should be 2 items sets at start of game").toHaveLength(2);
    expect(store.assignments(), "List of assignments should be empty").toEqual({});
    expect(store.players(), "When game was selected, one player should be added").toHaveLength(1);
  });

  it("should add player when addPlayer() was called", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);
    store.addPlayer('Player 1');
    expect(store.playersInGame(), "When addPlayer() was called, one player should be added").toHaveLength(2);
  })

  it("should allow to add more players when there are less than 6", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);
    store.addPlayer('Player 1');
    store.addPlayer('Player 2');
    store.addPlayer('Player 3');
    expect(store.playersInGame(), "There should be 4 players in game").toHaveLength(4);
    expect(store.canAddMorePlayer(), "4 players in game - should allow to add more players").toBeTruthy();
  })

  it("should not allow to add more players when there are 6 players", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);

    store.addPlayer('Player 1');
    store.addPlayer('Player 2');
    store.addPlayer('Player 3');
    store.addPlayer('Player 4');
    store.addPlayer('Player 5');
    expect(store.playersInGame(), "There should be 6 players in game").toHaveLength(6);
    expect(store.canAddMorePlayer(), "4 players in game - should not allow to add more players").toBeFalsy();
  })

  it("In case of 6 player we sould not be able to add more players", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);

    store.addPlayer('Player 1');
    store.addPlayer('Player 2');
    store.addPlayer('Player 3');
    store.addPlayer('Player 4');
    store.addPlayer('Player 5');

    store.addPlayer('Player 6');

    expect(store.playersInGame(), "There should be 6 players in game").toHaveLength(6);
    expect(store.canAddMorePlayer(), "6 players in game - should not allow to add more players").toBeFalsy();
  });

  it("should mark field as `have` when selectField() was called", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);
    store.addPlayer('Player 1');
    store.addPlayer('Player 2');

    store.selectField(1, 'room-1', 'have');
    store.selectField(2, 'suspect-2', 'may-have');
    expect(store.assignments()['room-1']["1"], "Right now room-1 should be assigned to player 1").toBeTruthy();
    expect(store.assignments()['room-1']["1"], "Right now room-1 should be assigned to player 1 (have)").toEqual('have');
    expect(store.assignments()['room-1']["2"], "Right now room-1 should not be assigned to player 2").toBeFalsy();

    expect(store.assignments()['suspect-2']["2"], "Right now suspect-2 should be assigned to player 2").toBeTruthy();
    expect(store.assignments()['suspect-2']["2"], "Right now suspect-2 should be assigned to player 2 (may-have)").toEqual('may-have');
    expect(store.assignments()['suspect-2']["1"], "Right now suspect-2 should not be assigned to player 1`").toBeFalsy();

    store.selectField(1, 'room-1', null);
    expect(store.assignments()['room-1']["1"], "(update) Right now room-1 should not be assigned to player 1").toBeFalsy();
    expect(store.assignments()['room-1']["1"], "(update) Right now room-1 should not be assigned to player 1 (null)").toBeNull();
  })

  it("should reset players and assignments when resetGame() was called", () => {
    TestBed.configureTestingModule({
      providers: [cluedoStore],
    });

    const store = TestBed.inject(cluedoStore);
    store.selectGame('test-game', TestingDataDefinition);
    store.addPlayer('Player 1');
    store.addPlayer('Player 2');

    store.selectField(1, 'room-1', 'have');
    expect(store.assignments()['room-1']["1"], "Right now room-1 should be assigned to player 1").toBeTruthy();
    expect(store.assignments()['room-1']["1"], "Right now room-1 and player 1 should be marked as `have`").toEqual('have');

    store.resetGame();

    expect(store.players(), "After reset players should include only one in game").toHaveLength(1);
    expect(store.assignments(), "After reset assignments should be empty").toEqual({});

    expect(store.items(), "Reset should not reset items").toHaveLength(TestingDataDefinition.definition.items.length);
    expect(store.suspects(), "Reset should not reset suspects").toHaveLength(TestingDataDefinition.definition.suspects.length);
    expect(store.rooms(), "Reset should not reset rooms").toHaveLength(TestingDataDefinition.definition.rooms.length);
  });

})
