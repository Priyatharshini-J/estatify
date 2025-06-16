"use strict";

const express = require("express");
const catalyst = require("zcatalyst-sdk-node");

const app = express();
app.use(express.json());


app.get("/properties", async (req, res) => {
	try {
		const catalystApp = catalyst.initialize(req);
		const rowPromise = await catalystApp.datastore().table('Properties').getPagedRows();
		res.status(200).send(rowPromise.data);
	} catch (err) {
		console.log("Error in getProperties >>> " + err);
		res.status(500).send({
			message: "Internal Server Error in Getting User Details. Please try again after sometime.",
			error: err,
		});
	}
});


app.get("/property/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const catalystApp = catalyst.initialize(req);
		const query = `Select * from Properties where id = '${id}'`;
		let result = await catalystApp.zcql().executeZCQLQuery(query);
		res.status(200).send(result[0]['Properties']);
	} catch (err) {
		console.log("Error in getProperties >>> " + err);
		res.status(500).send({
			message: "Internal Server Error in Getting User Details. Please try again after sometime.",
			error: err,
		});
	}
});


app.post("/schedule-viewing", async (req, res) => {
	try {
		const catalystApp = catalyst.initialize(req);
		const { userId, propertyId, name, phone, date, message } = req.body;
		const catalystTable = catalystApp.datastore().table('propertyBookings');
		const response = await catalystTable.insertRow({
			userId,
			propertyId,
			name,
			phone,
			visitDate: date,
			message
		});
		res.status(200).send({ message: `The visit has been successfully scheduled.`, bookingId: response.ROWID });
	} catch (err) {
		console.log(`Error in checkout >>> ` + JSON.stringify(err));
		res.status(500).send({
			message: "Internal Server Error. Please try again after sometime.",
			error: err
		});
	}
});

app.get("/schedules", async (req, res) => {
	try {
		const catalystApp = catalyst.initialize(req);
		const userId = req.query.userId;

		const query = `Select * from propertyBookings where userId = '${userId}'`;
		let bookingsResult = await catalystApp.zcql().executeZCQLQuery(query);

		if (bookingsResult.length === 0) {
			return res.status(200).json([]);
		}

		const propertyIds = bookingsResult.map(
			(row) => `'${row.propertyBookings.propertyId}'`
		);
		const uniquePropertyIds = [...new Set(propertyIds)].join(", ");


		const propertyQuery = `SELECT * FROM Properties WHERE id IN (${uniquePropertyIds})`;
		const propertyResult = await catalystApp.zcql().executeZCQLQuery(propertyQuery);

		const propertyMap = {};
		propertyResult.forEach((row) => {
			const prop = row.Properties;
			propertyMap[prop.id] = {
				id: prop.id,
				title: prop.title,
				address: prop.address + ", " + prop.city + ", " + prop.state + " " + prop.zipCode,
				images: prop.images,
			};
		});

		const finalSchedules = bookingsResult.map((row) => {
			const booking = row.propertyBookings;
			return {
				id: booking.ROWID,
				property: propertyMap[booking.propertyId] || {},
				date: booking.visitDate,
				booking_name: booking.name,
				booking_phone: booking.phone,
				booking_message: booking.message
			};
		});

		res.status(200).send(finalSchedules);
	} catch (err) {
		console.log(`Error in checkout >>> ` + JSON.stringify(err));
		res.status(500).send({
			message: "Internal Server Error. Please try again after sometime.",
			error: err
		});
	}
});


module.exports = app;