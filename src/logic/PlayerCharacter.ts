export class PlayerCharacter {
  atk: number;
  def: number;
  hp: number;

  constructor(atk: number, def: number, hp: number) {
    this.atk = atk;
    this.def = def;
    this.hp = hp;
  }

  clone(): PlayerCharacter {
    return new PlayerCharacter(this.atk, this.def, this.hp);
  }

  applyDamage(amount: number): void {
    this.hp -= amount;
  }

  heal(amount: number): void {
    this.hp += amount;
  }

  boostAttack(amount: number): void {
    this.atk += amount;
  }

  boostDefense(amount: number): void {
    this.def += amount;
  }

  isDead(): boolean {
    return this.hp <= 0;
  }

  getStats(): { atk: number; def: number; hp: number } {
    return {
      atk: this.atk,
      def: this.def,
      hp: this.hp
    };

  }
}  