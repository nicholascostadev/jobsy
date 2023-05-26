import { z } from 'zod';

export const addSectionSchema = z
    .object({
        sectionType: z.enum(['experience', 'certificate'], {
            invalid_type_error: 'Section type must be either experience or certificate.',
            required_error: 'Section type is required.'
        }),
        jobTitle: z
            .string({
                required_error: 'Job title is required.'
            })
            .min(1, 'Job title is required.'),
        jobCompany: z
            .string({
                required_error: 'Job description is required.'
            })
            .min(1, 'Job company is required.'),
        jobDescription: z
            .string({
                required_error: 'Job description is required.'
            })
            .min(1, 'Job description is required.'),
        jobStartDate: z
            .string({
                required_error: 'Job start date is required.'
            })
            .min(1, 'Job start date is required.'),
        jobEndDate: z.string().min(1).nullish(),
        onGoing: z.boolean().nullish()
    })
    .superRefine((values, ctx) => {
        const startDate = new Date(values.jobStartDate);
        const currentDate = new Date();

        function earlierThanToday(date: Date) {
            return date.getTime() <= currentDate.getTime();
        }

        if (!earlierThanToday(startDate)) {
            ctx.addIssue({
                code: 'custom',
                path: ['jobStartDate'],
                message: 'Start date must have started at least today.'
            });
        }

        if (values.jobEndDate && !earlierThanToday(new Date(values.jobEndDate))) {
            ctx.addIssue({
                code: 'custom',
                path: ['jobEndDate'],
                message: 'End date must have ended at most today.'
            });
        }

        if (
            !values.onGoing &&
            values.jobEndDate &&
            new Date(values.jobEndDate).getTime() <= startDate.getTime()
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['jobStartDate'],
                message: 'Start date must be before end date.'
            });

            ctx.addIssue({
                code: 'custom',
                path: ['jobEndDate'],
                message: 'End date must be after started date..'
            });
        }
    });
