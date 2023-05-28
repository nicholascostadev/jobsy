import { z } from 'zod';

export const sectionTypeSchema = z.enum(['experience', 'certificate'], {
    invalid_type_error: 'Section type must be either experience or certificate.',
    required_error: 'Section type is required.'
});

export const addExperienceSchema = z
    .object({
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

export type AddExperienceSchema = z.infer<typeof addExperienceSchema>;

export const addCertificateSchema = z
    .object({
        title: z
            .string({
                required_error: 'Certificate must have a title.'
            })
            .min(1, 'Certificate must have a title.'),
        description: z.string().optional(),
        url: z
            .string()
            .url('Certificate url must be a valid URL')
            .startsWith('https://', 'Certificate url must start with https')
            .optional(),
        issueDate: z
            .string({
                required_error: 'Issue date is required.'
            })
            .min(1)
    })
    .superRefine((values, ctx) => {
        const startDate = new Date(values.issueDate);
        const currentDate = new Date();

        function earlierThanToday(date: Date) {
            return date.getTime() <= currentDate.getTime();
        }

        if (!earlierThanToday(startDate)) {
            ctx.addIssue({
                code: 'custom',
                path: ['issueDate'],
                message: 'Issue date must have started at least today.'
            });
        }
    });

export type AddCertificateSchema = z.infer<typeof addCertificateSchema>;
