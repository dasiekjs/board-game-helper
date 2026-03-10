import { TestBed } from '@angular/core/testing';
import { DreamsStore } from './dreams-store';

describe('DreamsStore', () => {
  let store: InstanceType<typeof DreamsStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DreamsStore],
    });

    store = TestBed.inject(DreamsStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();

    expect(store.players()).toEqual([]);
    expect(store.history()).toEqual([]);
    expect(store.status()).toBe('collect-players');

  });

  it('should add new player when addPlayer() was called', () => {
    const playerName = 'John Doe';

    store.addPlayer(playerName);

    expect(store.players().length).toBe(1);
    expect(store.players()[0].name).toBe(playerName);
    expect(store.players()[0].id).toBe(1);
    expect(store.players()[0].points).toBe(0);

    // add another player

    store.addPlayer('Jane Doe 2');

    expect(store.players().length).toBe(2);
    expect(store.players()[1].name).toBe('Jane Doe 2');
    expect(store.players()[1].id).toBe(2);
    expect(store.players()[1].points).toBe(0);
  });

  it('should not add more than 5 players', () => {
    store.addPlayer('John Doe');
    store.addPlayer('John Doe 2');
    store.addPlayer('John Doe 3');
    store.addPlayer('John Doe 4');
    store.addPlayer('John Doe 5');
    store.addPlayer('John Doe 6');
    store.addPlayer('John Doe 7');

    expect(store.players().length).toBe(5);
    expect(store.players()[4].name).toBe('John Doe 5');
    expect(store.players()[4].id).toBe(5);
    expect(store.players()[4].points).toBe(0);
  });

  it('should not allow to start game when there are less than 2 players', () => {
    store.startGame();
    expect(store.status()).toBe('collect-players');

    store.addPlayer('John Doe');
    store.startGame();
    expect(store.status()).toBe('collect-players');

    store.addPlayer('Jane Doe 2s');
    store.startGame();
    expect(store.status()).toBe('in-progress');
  });

  it('should not allow to add points when the game was not started', () => {
    store.addPlayer('John Doe');
    store.addPlayer('John Doe 2');
    store.finishRound([
      { playerId: 1, points: 10 },
      { playerId: 2, points: 10 }
    ], 1);

    expect(store.players()[0].points).toBe(0);
    expect(store.players()[1].points).toBe(0);
    expect(store.history(), 'Should not increase history num').toHaveLength(0);
  });

  it('should add valid points when the game was started', () => {
    store.addPlayer('John Doe');
    store.addPlayer('John Doe 2');
    store.startGame();
    store.finishRound([
      { playerId: 1, points: 10 },
      { playerId: 2, points: 12 }
    ]);

    expect(store.players()[0].points).toBe(10);
    expect(store.players()[1].points).toBe(12);
    expect(store.currentRound(), 'Current round should be 2').toBe(2);
    expect(store.history(), 'Should increase history num').toHaveLength(1);
  });

  it('should add 5 penalty points when finalized player does not have the lowest score', () => {
    store.addPlayer('Me');
    store.addPlayer('My Wife');
    store.startGame();
    store.finishRound([
      { playerId: 1, points: 10 },
      { playerId: 2, points: 6 }
    ], 1);

    expect(store.players()[0].points).toBe(15);
    expect(store.players()[1].points).toBe(6);
    expect(store.currentRound(), 'Current round should be 2').toBe(2);
    expect(store.history(), 'Should increase history num').toHaveLength(1);
  });

  it('should not add penalty points when finalized player has the lowest score', () => {
    store.addPlayer('Me');
    store.addPlayer('My Wife');
    store.startGame();
    store.finishRound([
      { playerId: 1, points: 5 },
      { playerId: 2, points: 10 }
    ], 1);

    expect(store.players()[0].points).toBe(5);
    expect(store.players()[1].points).toBe(10);
    expect(store.currentRound(), 'Current round should be 2').toBe(2);
    expect(store.history(), 'Should increase history num').toHaveLength(1);
  });

  it('should save valid history for each round', () => {
    // TODO
  });

  it('should finalize game when someone reached more than 100 points', () => {
    store.addPlayer('Me');
    store.addPlayer('My Wife');
    store.startGame();
    store.finishRound([
      { playerId: 1, points: 99 },
      { playerId: 2, points: 98 }
    ], 1);

    expect(store.players()[0].points).toBe(104);
    expect(store.players()[1].points).toBe(98);

    expect(store.status(), 'Game should be finished').toBe('finished');
    expect(store.currentRound(), 'Current round should not be changed').toBe(1);
  });
});
