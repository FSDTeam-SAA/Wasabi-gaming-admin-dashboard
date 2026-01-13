"use client";
import React, { useState } from 'react';
import Headers from "../../Reusable/Headers";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import ReusableModal from '../../Reusable/ReusableModal';

const Premium = () => {
  const [open, setOpen] = useState(false);

  const handleSave = (data) => {
    console.log("Saved data:", data);
    setOpen(false);
  };

  const features = [
    "Unlimited courses and students",
    "Advanced analytics dashboard",
    "Custom branding options",
    "Priority customer support",
    "Bulk student management",
    "Advanced quizzes customization"
  ];

  const plans = [
    {
      name: "Free",
      price: "",
      period: "",
      description: "Basic plan with limited features",
      features: [
        "Up to 100 students",
        "5 courses",
        "Basic reports",
        "Community support"
      ],
      isCurrent: true,
      buttonText: "Current Plan",
      buttonStyle: "bg-gray-100 text-gray-500 cursor-not-allowed",
      type: "text-only"
    },
    {
      name: "School",
      price: "",
      period: "",
      description: "Educational institution plan",
      features: [
        "Up to 500 students",
        "Unlimited courses",
        "Advanced analytics",
        "Priority email support",
        "Custom domains"
      ],
      isCurrent: true,
      buttonText: "Current Plan",
      buttonStyle: "bg-[#FFFF00] text-black hover:bg-yellow-400 transition-colors",
      type: "text-only"
    },
    {
      name: "Premium",
      price: "£ 99",
      period: "/month",
      description: "Advanced features for scaling businesses",
      features: [
        "Unlimited students",
        "Custom branding",
        "Priority 24/7 support",
        "Advanced integrations",
        "API access"
      ],
      isCurrent: false,
      buttonText: "Edit",
      buttonStyle: "bg-[#FFFF00] text-black hover:bg-yellow-400 transition-colors",
      type: "price"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Headers
          title={"Plans"}
          subHeader={"Manage all plans available for your students"}
        />
      </div>

      <div className="bg-gradient-to-r from-[#FEFCE8] to-[#FEF9C2] shadow-xl rounded-2xl p-6 border border-yellow-200">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-[16px] popreg font-medium">Upgrade to Premium</p>
              <span className="text-[12px] popmed px-3 py-1 bg-yellow-300 rounded-full font-medium">
                Save 20%
              </span>
            </div>

            <p className="text-[14px] popreg text-gray-700 max-w-md">
              Unlock advanced features and scale your school management platform to the next level.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <p key={index} className="flex items-center gap-2 popreg text-sm">
                  <MdOutlineDone className="text-green-600 flex-shrink-0" />
                  {feature}
                </p>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-bold popmed">
                £ 99 <span className="text-sm font-normal text-gray-600">/Month</span>
              </p>
              <p className="text-sm popreg text-gray-700">
                or £ 950/year <span className="text-green-600 font-medium">(20% off)</span>
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-5 items-center lg:items-end">
            <button
              onClick={() => setOpen(true)}
              className="w-full lg:w-auto bg-[#FFFF00] text-black px-6 py-3 rounded-3xl font-medium popmed
                        shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]
                        hover:bg-yellow-400 transition-colors duration-200"
            >
              Edit Now
            </button>
            <p className="text-sm popreg text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200">
              Learn More
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between w-full bg-white rounded-2xl border border-gray-200 shadow-[0px_1px_2px_0px_#0000000D] hover:shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] p-6 transition-all duration-300 ${plan.isCurrent ? "ring-2 ring-green-300 border-green-200" : "hover:-translate-y-1"
              }`}
          >
            {/* Plan Header */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{plan.description}</p>
                </div>
                {plan.isCurrent && (
                  <span className="text-green-700 bg-green-100 text-xs font-medium px-3 py-1.5 rounded-full">
                    Current
                  </span>
                )}
              </div>

              {/* Price Display - Only for Premium plan */}
              {plan.type === "price" ? (
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
                    <p className="text-sm text-gray-500">{plan.period}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600 font-medium">£ 950/year</span> (Save 20%)
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="h-10 flex items-center">
                    <p className="text-lg font-medium text-gray-700">Custom Pricing</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Contact for details</p>
                </div>
              )}

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <MdOutlineDone className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button
              disabled={plan.isCurrent}
              onClick={() => setOpen(true)}
              className={`mt-8 w-full py-3 rounded-xl font-medium text-sm shadow-sm transition-colors ${plan.isCurrent
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-[#FFFF00] text-black hover:bg-yellow-400"
                }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <ReusableModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        location={'plans'}
        title="Update Plan"
        edit={true}
        submitText="Update"
      />
    </div>
  );
};

export default Premium;