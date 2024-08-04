import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { z } from "zod";
import { create } from "zustand";

import { useAppNavigation } from "../../../utils/navigation";
import { emptyProjectFormData, fakeTeamAndLink } from "../defaultValues";
import { MilestoneFormValues } from "../types";

export const zodProjectTeamAndLinkFormData = z.object({
  websiteLink: z.string().url(),
  twitterProfile: z.string().url(),
  discordLink: z.string().url(),
  githubLink: z.string().url(),
  teamDesc: z.string(),
});

export type ProjectTeamAndLinkFormData = z.infer<
  typeof zodProjectTeamAndLinkFormData
>;

export const zodProjectFormData = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  creatorKind: z.enum(["funder", "contractor"]),
  creatorAddress: z.string().min(1),
  targetAddress: z.string().min(1).optional(),
  arbitratorAddress: z.string().min(1),
  tags: z.string(),
  coverImg: z.string().min(1), // web3 uri
});

export type ProjectFormData = z.infer<typeof zodProjectFormData>;

type MakeRequestState = {
  stepIndice: number;
  projectFormData: ProjectFormData;
  teamAndLinkData: ProjectTeamAndLinkFormData;
  milestones: MilestoneFormValues[];
  actions: {
    setShortDesc: (shortDescData: ProjectFormData) => void;
    setTeamAndLink: (teamAndLinkData: ProjectTeamAndLinkFormData) => void;

    addMilestone: (milestone: MilestoneFormValues) => void;
    removeMilestone: (id: string) => void;
  };
};

const TOTAL_STEPS = 5;

const useMakeRequestStore = create<MakeRequestState>((set, get) => ({
  stepIndice: 1,
  projectFormData: emptyProjectFormData,
  teamAndLinkData: fakeTeamAndLink,
  milestones: [],
  actions: {
    setShortDesc: (shortDescData) => set({ projectFormData: shortDescData }),
    setTeamAndLink: (teamAndLinkData) => {
      set({ teamAndLinkData });
    },
    addMilestone: (milestone) => {
      const updatedMilestones = [...get().milestones, milestone].map(
        (t, idx) => {
          t.id = idx.toString();
          return t;
        },
      );

      set({ milestones: updatedMilestones });
    },
    removeMilestone: (id) => {
      const updatedMilestones = get()
        .milestones.filter((t) => t.id !== id)
        .map((t, idx) => {
          t.id = idx.toString();
          return t;
        });

      set({ milestones: updatedMilestones });
    },
  },
}));

export const useMakeRequestState = () => {
  const navigation = useAppNavigation();
  const store = useMakeRequestStore();
  const route = useRoute();
  const step = !route.params ? 1 : (route.params as any).step;

  const stepIndex = useMemo(() => {
    try {
      let res = step ? parseInt(step, 10) : 1;
      res = Number.isInteger(res) ? res : 1;
      res = res > 5 || res < 0 ? 1 : res;
      return res;
    } catch {
      return 1;
    }
  }, [step]);

  const gotoStep = (stepIndex: number) => {
    navigation.navigate("ProjectsMakeRequest", { step: stepIndex });
  };

  const goNextStep = () => {
    const nextStep = Math.min(stepIndex + 1, TOTAL_STEPS);
    gotoStep(nextStep);
  };

  const goPrevStep = () => {
    const prevStep = Math.max(stepIndex - 1, 1);
    gotoStep(prevStep);
  };

  return {
    ...store,
    stepIndice: stepIndex,
    actions: {
      ...store.actions,
      goNextStep,
      goPrevStep,
      gotoStep,
    },
  };
};