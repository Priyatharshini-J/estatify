/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import ContactAgentDialog from "@/components/dialog/ContactAgentDialog";
import Navbar from "@/components/layout/Navbar";
import Layout from "@/components/layout/Layout";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface Schedule {
  id: string;
  property: {
    id: string;
    title: string;
    address: string;
    images: string;
  };
  date: string;
  booking_name: string;
  booking_phone: string;
  booking_message: string;
}

const MySchedules = () => {
  const [userId, setUserId] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const currentUserPromise = catalyst.userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUserId(response.content.user_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!userId || userId == 0) return;
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(
          "https://slate-template-apps-773793963.development.catalystserverless.com/server/estatify_routes_handler/schedules",
          {
            params: {
              userId: userId,
            },
          }
        );
        setSchedules(res.data);
      } catch (error) {
        console.error("Failed to fetch schedules", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSchedules();
  }, [userId]);

  const openAgentDialog = () => {
    setDialogOpen(true);
  };

  if (isFetching) {
    <LoadingSpinner />;
  }

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <Layout>
          <div className="p-6 max-w-6xl mx-auto">
            {schedules.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-500">
                <p className="text-xl font-semibold text-gray-700">
                  You haven’t scheduled any visits yet.
                </p>
                <p className="text-m text-gray-500 mt-2 mb-6">
                  Start exploring properties to book your first visit!
                </p>
                <Link to="/properties">
                  <Button
                    variant="outline"
                    className="px-6 py-2 text-sm rounded-lg shadow"
                  >
                    Browse Properties
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">My Scheduled Visits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schedules.map((schedule) => {
                    const imageUrls = schedule.property.images
                      .split('", "')
                      .map((url) => url.replace(/^"|\\"$/g, ""));

                    return (
                      <div
                        key={schedule.id}
                        className="border border-border rounded-xl shadow hover:shadow-md transition cursor-pointer overflow-hidden"
                        onClick={() =>
                          navigate(`/property/${schedule.property.id}`)
                        }
                      >
                        <img
                          src={imageUrls[0]}
                          alt={schedule.property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                          <h3 className="text-xl font-semibold">
                            {schedule.property.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {schedule.property.address}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Booking Name:{" "}
                            <span className="font-medium">
                              {schedule.booking_name}
                            </span>
                          </p>
                          <p className="text-gray-500 text-sm">
                            Booking Phone:{" "}
                            <span className="font-medium">
                              {schedule.booking_phone}
                            </span>
                          </p>
                          <p className="text-gray-500 text-sm">
                            Visit Date:{" "}
                            <span className="font-medium">{schedule.date}</span>
                          </p>
                          <p className="text-gray-500 text-sm">
                            Booking message:{" "}
                            <span className="font-medium">
                              {schedule.booking_message
                                ? schedule.booking_message
                                : "-"}
                            </span>
                          </p>
                          <Button
                            className="mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              openAgentDialog();
                            }}
                          >
                            Contact Agent
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <ContactAgentDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
            />
          </div>
        </Layout>
      )}
    </>
  );
};

export default MySchedules;
