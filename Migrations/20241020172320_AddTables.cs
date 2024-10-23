using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KinstonBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModuleNames",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "NumberOfModules",
                table: "Courses",
                newName: "EnrollmentCount");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Modules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Enrollments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Courses",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Modules");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "EnrollmentCount",
                table: "Courses",
                newName: "NumberOfModules");

            migrationBuilder.AddColumn<string>(
                name: "ModuleNames",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
