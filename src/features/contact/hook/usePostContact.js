// src/hooks/useContactUs.js
import { useMutation } from "@tanstack/react-query";
import { ContactUs } from "../api/postContact";

export const useContactUs = () => {
    return useMutation({
        mutationFn: ContactUs,
    });
};