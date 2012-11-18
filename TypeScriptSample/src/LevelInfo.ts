/// <reference path="EnemyInfo.ts" />

class LevelInfo { 
    public start: number;
    public end: number;
    public gap: number;
    public enemy: EnemyInfo;
    public override: any;
    constructor (start: number, end: number, gap: number, enemy: EnemyInfo, override: any = {}) {
        this.start = start;
        this.end = end;
        this.gap = gap;
        this.enemy = enemy;
        this.override = override;
    }
}
