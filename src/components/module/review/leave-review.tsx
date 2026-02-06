"use client";

import { leaveReviewAction, updateReviewAction } from "@/actions/review";
import SubmitButton from "@/components/common/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/helpers/get-error";
import { IReview } from "@/types/review-type";
import { reviewSchema } from "@/validations/review-schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

const LeaveReview = ({
  medicineId,
  existingReview,
  onClose,
}: {
  medicineId: string;
  existingReview?: IReview;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      rating: existingReview ? existingReview.rating : 0,
      content: existingReview ? existingReview.content : "",
    },

    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Submitting your review...");

      try {
        if (existingReview) {
          const { success, message } = await updateReviewAction(
            existingReview.id,
            value,
          );

          if (success === false) {
            toast.error(message, { id: toastId });
          } else {
            toast.success("Review updated successfully", { id: toastId });
            onClose();
          }
        } else {
          const { success, message } = await leaveReviewAction(
            medicineId,
            value,
          );

          if (success === false) {
            toast.error(message, { id: toastId });
          } else {
            toast.success("Review submitted successfully", { id: toastId });
            onClose();
          }
        }
      } catch (error) {
        toast.error(getErrorMessage(error), { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {existingReview ? "Update Review" : "Leave a Review"}
        </CardTitle>
        <CardDescription>
          Share your feedback about the product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 relative"
        >
          <form.Field
            name="rating"
            children={(field) => (
              <ul>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li
                    key={star}
                    className={`inline-block cursor-pointer text-2xl ${
                      field.state.value >= star
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => field.setValue(star)}
                  >
                    ★
                  </li>
                ))}
              </ul>
            )}
          />
          <form.Field
            name="content"
            children={(field) => (
              <div>
                <Textarea
                  id="content"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Write your review here..."
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <SubmitButton
          formName="review-form"
          label={existingReview ? "Update Review" : "Submit Review"}
          loading={loading}
        />
      </CardFooter>
    </Card>
  );
};

export default LeaveReview;
