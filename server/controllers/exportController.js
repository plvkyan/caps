const ExcelJS = require('exceljs');
const path = require('path');

const exportAmenityDetails = async (req, res) => {
    try {
        const {
            userBlkLt,
            amenityName,
            amenityType,
            amenityAddress,
            amenityDescription,
            amenityReminder,
            amenityVisibility,
        } = req.body;

        const workbook = new ExcelJS.Workbook();

        workbook.creator = userBlkLt;
        workbook.lastModifiedBy = userBlkLt;
        workbook.created = new Date();
        workbook.modified = new Date();

        const amenitySheet = workbook.addWorksheet("Amenity Details");
        amenitySheet.properties.defaultRowHeight = 30;

        amenitySheet.columns = [
            { header: "Amenity Name", key: "amenityName", width: 20 },
            { header: "Amenity Type", key: "amenityType", width: 20 },
            { header: "Amenity Address", key: "amenityAddress", width: 20 },
            { header: "Amenity Description", key: "amenityDescription", width: 20 },
            { header: "Amenity Reminder", key: "amenityReminder", width: 20 },
            { header: "Amenity Visibility", key: "amenityVisibility", width: 20 }
        ];

        amenitySheet.addRow({
            amenityName,
            amenityType,
            amenityAddress,
            amenityDescription,
            amenityReminder,
            amenityVisibility,
        });

        const filename = 'amenity-export.xlsx';
        await workbook.xlsx.writeFile(filename);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.sendFile(path.resolve(filename));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to export file' });
    }
};

module.exports = { exportAmenityDetails };
