import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "show_room",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "film",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "filmName", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "seat_type",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "show_room_seat_mapping",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "showRoomId", type: "integer", isNullable: true },
          { name: "seatNumber", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "show_room_seat_mapping",
      new TableForeignKey({
        columnNames: ["showRoomId"],
        referencedColumnNames: ["id"],
        referencedTableName: "show_room",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "show_mapping",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "showRoomId", type: "integer", isNullable: true },
          { name: "filmId", type: "integer", isNullable: true },
          { name: "start", type: "timestamp" },
          { name: "end", type: "timestamp" },
          { name: "status", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "show_mapping",
      new TableForeignKey({
        columnNames: ["showRoomId"],
        referencedColumnNames: ["id"],
        referencedTableName: "show_room",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "show_mapping",
      new TableForeignKey({
        columnNames: ["filmId"],
        referencedColumnNames: ["id"],
        referencedTableName: "film",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "pricing",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "showMappingId", type: "integer", isNullable: true },
          { name: "seatTypeId", type: "integer", isNullable: true },
          { name: "seatPriceType", type: "varchar" },
          { name: "seatPriceValue", type: "varchar" },
          { name: "status", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "pricing",
      new TableForeignKey({
        columnNames: ["showMappingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "show_mapping",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "pricing",
      new TableForeignKey({
        columnNames: ["seatTypeId"],
        referencedColumnNames: ["id"],
        referencedTableName: "seat_type",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "booking",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "userId", type: "integer", isNullable: true },
          { name: "showMappingId", type: "integer", isNullable: true },
          { name: "showRoomSeatingId", type: "integer", isNullable: true },
          { name: "pricingId", type: "integer", isNullable: true },
          { name: "status", type: "varchar" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "booking",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "booking",
      new TableForeignKey({
        columnNames: ["showMappingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "show_mapping",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "booking",
      new TableForeignKey({
        columnNames: ["showRoomSeatingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "show_room_seat_mapping",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "booking",
      new TableForeignKey({
        columnNames: ["pricingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "pricing",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
