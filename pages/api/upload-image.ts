import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { v4 as uuidv4 } from "uuid";

// API 라우트는 기본적으로 body
